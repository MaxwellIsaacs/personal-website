#include <iostream>
#include <SDL.h>
#include <SDL_image.h>
#include <vector>

#include "window.h"
#include "board.h" 
#include "move.h"


#define SCREEN_SIZE 600

SDL_Color highlightColor = {220, 220, 220, 200};

int main () {
    Window win("CHESS", SCREEN_SIZE, SCREEN_SIZE);
    if (!win.init()) {
        return 1;
    }

    Board board;
    board.setBoard(win.getRenderer());

    bool quit = false;
    SDL_Event e;

    // selected piece utility
    bool pieceSelected = false;
    int selectedX = 0, selectedY = 0; 


    while (!quit) {
        while (SDL_PollEvent(&e) != 0) {
            if (e.type == SDL_QUIT) {
                quit = true;
            } else if (e.type == SDL_MOUSEBUTTONDOWN) {
                loc mousePosition;
                SDL_GetMouseState(&mousePosition.x, &mousePosition.y);
                
                int boardX = mousePosition.x / (SCREEN_SIZE / 8);
                int boardY = mousePosition.y / (SCREEN_SIZE / 8);

                if (!pieceSelected) {
                  selectedX = boardX;
                  selectedY = boardY;
                  pieceSelected = true;
                  board.toggleHighlight(boardX, boardY);
                }
                else {
                  const gameBoard tempBoard = board.getBoard();
                  loc tempFirst;
                  tempFirst.x = selectedX;
                  tempFirst.y = selectedY;

                  loc tempSecond;
                  tempSecond.x = boardX;
                  tempSecond.y = boardY;

                  bool tempIsWhite = tempBoard[selectedX][selectedY].piece.color; 

                  Piece tempPiece = tempBoard[selectedX][selectedY].piece.type;

                  Move move(tempFirst, tempSecond, tempIsWhite, tempBoard, tempPiece); 
                  
                  if (move.checkMove()) board.movePiece(tempFirst, tempSecond);

                  pieceSelected = false;
                  board.toggleHighlight(selectedX, selectedY);
                }

            }
        }

        gameBoard currentBoard = board.getBoard();
        
        win.clear();

        for (int i = 0; i < 8; ++i) {
            for (int y = 0; y < 8; ++y) {
                win.setDrawColor(currentBoard[i][y].color);
                win.drawRect(currentBoard[i][y].r);
                if (currentBoard[i][y].piece.type != EMPTY) {
                  if (currentBoard[i][y].highlighted) {
                    win.setDrawColor(highlightColor);
                    win.drawRect(currentBoard[i][y].r);
                  }
                  win.drawPiece(currentBoard[i][y]);
                }
            }
        }

        win.display();
    }
}


