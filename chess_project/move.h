#ifndef MOVE_H
#define MOVE_H

#include <vector>
#include <utility>
#include "board.h"



using pos = std::pair<loc&, loc&>;

using oppPiece = std::pair<Piece, loc>;

class Move { 
public:
    Move(loc& first, loc& second, bool isWhite, gameBoard board, Piece piece);
    ~Move();

    // delete copy constructor and operator  
    Move(const Move&) = delete;
    Move& operator=(const Move&) = delete;

    bool validPawn();


    bool validRook();


    bool validBishop();


    bool validKnight();


    bool validKing(); 


    bool validQueen(); 


  //  bool validEnPassent();


 //   bool validCastle();
    
    
    bool checkMove();
 

 //   bool checkPin() {}
    bool checkCapture();

    oppPiece getCapture();

private:
    loc& start;
    loc& finish;
    bool isWhite;
    gameBoard& board_;
    Piece piece_;
};

#endif
