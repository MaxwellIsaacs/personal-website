#include "move.h"
#include "board.h"


Move::Move(loc& first, loc& second, bool isWhite, gameBoard board,  Piece piece) : start(first), finish(second), isWhite(isWhite), board_(board), piece_(piece) {}

Move::~Move() {}


bool Move::validPawn() {

    if (start.y > finish.y && !isWhite) return false;
    if (start.y < finish.y && isWhite) return false;

    int x_distance = abs(finish.x - start.x);
    int y_distance = abs(finish.y - start.y);


    bool isStart = start.y == 1 || start.y == 6;

  
    if (x_distance == 0) {
        if (y_distance == 1) {
            return true;
        } else if (y_distance == 2 && isStart) {
            return true;
        }
    }
    return false;
}


bool Move::validRook() {
  unsigned int x_distance = abs(start.x - finish.x);
  unsigned int y_distance = abs(start.y - finish.y);

  return x_distance == 0 || y_distance == 0;
}



bool Move::validKnight() {
  unsigned int x_distance = abs(start.x - finish.x);
  unsigned int y_distance = abs(start.y - finish.y);

  return (x_distance == 1 && y_distance == 2 || x_distance == 2 && y_distance == 1);
}


bool Move::validKing() {
  unsigned int x_distance = abs(start.x - finish.x);
  unsigned int y_distance = abs(start.y - finish.y);

  if (x_distance > 1 || y_distance > 1) {return false;}

  return true;
}


//bool Move::validCastle() {}


//bool Move::validEnPassent() {}

bool Move::validBishop() {
  unsigned int x_distance = abs(start.x - finish.x);
  unsigned int y_distance = abs(start.y - finish.y);

  return x_distance == y_distance;
}


bool Move::validQueen() {
  if (validBishop() || validRook()) {return true;}
  return false;
}


//bool Move::checkPin() {}

//bool Move::checkCapture() {
  

 

bool Move::checkMove () {
  switch(piece_) { 
    case KNIGHT:
      return validKnight();    
      break;
    case PAWN:
      return validPawn();
      break;
    case ROOK:
      return validRook();
      break;
    case BISHOP:
      return validBishop();
      break;
    case KING:
      return validKing();
      break;
    case QUEEN:
      return validQueen();
      break;
    case CASTLE_ROOK:
      return validRook();
      break;
    case CASTLE_KING:
      return validKing();
      break;
    case EMPTY:
      break;
    case EN_PASSENT:
      break;
      return false;
  }
  return false;
} 

bool Move::checkCapture() {
  if (board_[finish.x][finish.y].piece.type != EMPTY && board_[finish.x][finish.y].piece.color != board_[start.x][start.y].piece.color) {
    return true;
  } else {
    return false;
  }
}


oppPiece Move::getCapture () {
  oppPiece p;
  return p;
} 
