#ifndef BOARD_H
#define BOARD_H

#include <iostream>
#include <SDL.h>
#include <string>
#include <vector>
#include <utility>
#include <SDL_image.h>

#define SIZE 9

struct Square;

using gameBoard = std::vector<std::vector<Square>>;


enum Piece {
    EMPTY,
    KNIGHT,
    KING,
    BISHOP,
    PAWN,
    QUEEN,
    ROOK,
    CASTLE_ROOK,
    CASTLE_KING,
    EN_PASSENT
};

struct P {
  Piece type;
  bool color;
  SDL_Texture* photo;
};

struct Square {
    SDL_Rect r;
   // std::pair <p, SDL_Texture*> piece;
    P piece;
    SDL_Color color;
    bool highlighted;
    bool c;
    bool pinned;
};

struct loc {
    int x;
    int y;
};

class Board {
public:
    Board();
    ~Board();    

    // delete copy constructor and operator  
    Board(const Board&) = delete;
    Board& operator=(const Board&) = delete;

    void setBoard(SDL_Renderer* renderer);
    gameBoard getBoard() const;
    void movePiece(loc& first, loc& second);
    SDL_Texture* loadPieceTexture(SDL_Renderer* renderer, Piece piece, bool color);
    void toggleHighlight(int x, int y);

private:
    gameBoard board_;    
};

#endif

