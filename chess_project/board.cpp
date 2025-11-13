#include "board.h"

#define CELL_SIZE 75

Board::Board() : board_(8, std::vector<Square>(8)) {
    for (int x = 0; x < 8; ++x) {
        bool alt = x % 2 == 0;
        for (int y = 0; y < 8; ++y) {
            board_[x][y].r.x = x * CELL_SIZE;
            board_[x][y].r.y = y * CELL_SIZE;
            board_[x][y].r.h = CELL_SIZE;
            board_[x][y].r.w = CELL_SIZE;
            if (alt == true) {board_[x][y].color = (SDL_Color) {205, 162, 249, 100};}
            if (alt == false) {board_[x][y].color = (SDL_Color) {47, 15, 98, 100};}
            board_[x][y].c = alt;
            alt = !alt;
        }
    }
}


Board::~Board() {    
    for (auto& outer : board_) {
        for (auto& inner : outer) {
            SDL_DestroyTexture(inner.piece.photo);
        }
    }
}



SDL_Texture* Board::loadPieceTexture(SDL_Renderer* renderer, Piece piece, bool color) {
    std::string basePath = "Desktop/pieces/";
    std::string filename;

    // Determine the file name based on type and color
    switch (piece) {
        case PAWN: filename = "pawn"; break;  
        case EN_PASSENT: filename = "pawn"; break;
        case KNIGHT: filename = "knight"; break;
        case BISHOP: filename = "bishop"; break;
        case ROOK: filename = "rook"; break;
        case CASTLE_ROOK: filename = "rook"; break;
        case QUEEN: filename = "queen"; break;
        case CASTLE_KING: filename = "king"; break;
        case KING: filename = "king"; break;
        case EMPTY: break;

        // Add other cases as needed
    }

    if (color) {
        filename += "_white.png";
    } else {
        filename += "_black.png";
    }

    // Combine base path and filename
    std::string fullPath = basePath + filename;

    // Load the image into an SDL_Surface
    SDL_Surface* loadedSurface = IMG_Load(fullPath.c_str());
    if (!loadedSurface) {
        std::cerr << "Unable to load image " << fullPath << " SDL_image Error: " << IMG_GetError();
        return nullptr;
    }

    // Convert the surface to a texture
    SDL_Texture* texture = SDL_CreateTextureFromSurface(renderer, loadedSurface);
    SDL_FreeSurface(loadedSurface); // We no longer need the surface

    return texture;
}


void Board::setBoard(SDL_Renderer* renderer) {
    // Initialize empty spaces
    for (int i = 2; i < 6; i++) {
        for (int j = 0; j < 8; j++) {
            board_[i][j].piece = {EMPTY, false, nullptr};  // Assuming color doesn't matter for EMPTY
        }
    }

    // Set pawns
    for (int j = 0; j < 8; j++) {
        board_[j][1].piece = {PAWN, false, loadPieceTexture(renderer, PAWN, false)};
        board_[j][6].piece = {PAWN, true, loadPieceTexture(renderer, PAWN, true)};
    }

    // Correcting and simplifying the rook placement
    board_[0][0].piece = {ROOK, false, loadPieceTexture(renderer, ROOK, false)};
    board_[7][0].piece = {ROOK, false, loadPieceTexture(renderer, ROOK, false)};
    board_[0][7].piece = {ROOK, true, loadPieceTexture(renderer, ROOK, true)};
    board_[7][7].piece = {ROOK, true, loadPieceTexture(renderer, ROOK, true)};

    // Knights
    board_[1][0].piece = {KNIGHT, false, loadPieceTexture(renderer, KNIGHT, false)};
    board_[6][0].piece = {KNIGHT, false, loadPieceTexture(renderer, KNIGHT, false)};
    board_[1][7].piece = {KNIGHT, true, loadPieceTexture(renderer, KNIGHT, true)};
    board_[6][7].piece = {KNIGHT, true, loadPieceTexture(renderer, KNIGHT, true)};

    // Bishops
    board_[2][0].piece = {BISHOP, false, loadPieceTexture(renderer, BISHOP, false)};
    board_[5][0].piece = {BISHOP, false, loadPieceTexture(renderer, BISHOP, false)};
    board_[2][7].piece = {BISHOP, true, loadPieceTexture(renderer, BISHOP, true)};
    board_[5][7].piece = {BISHOP, true, loadPieceTexture(renderer, BISHOP, true)};

    // Queens
    board_[3][0].piece = {QUEEN, false, loadPieceTexture(renderer, QUEEN, false)};
    board_[3][7].piece = {QUEEN, true, loadPieceTexture(renderer, QUEEN, true)};

    // Kings
    board_[4][0].piece = {KING, false, loadPieceTexture(renderer, KING, false)};
    board_[4][7].piece = {KING, true, loadPieceTexture(renderer, KING, true)};
}
    


gameBoard Board::getBoard() const {
    return this->board_;
}

void Board::movePiece (loc& first, loc& second) {
    this->board_[second.x][second.y].piece = this->board_[first.x][first.y].piece;
    this->board_[first.x][first.y].piece.type = EMPTY;
}

void Board::toggleHighlight(int x, int y) {
    this->board_[x][y].highlighted = !this->board_[x][y].highlighted ; 
}
