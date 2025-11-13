#ifndef WINDOW_H
#define WINDOW_H

#include <SDL.h>
#include <string>
#include "board.h"
#include <utility>
#include <SDL_image.h>

class Window {
public:
    Window(const std::string& title, int width, int height);
    ~Window();

    // delete copy constructor and operator 
    Window(const Window&) = delete;
    Window& operator=(const Window&) = delete;

    bool init();
    void display();
    void clear();
    void setDrawColor(SDL_Color color);
    void drawRect(SDL_Rect rect);
    SDL_Renderer* getRenderer();
    void drawPiece(Square& piece);
    
private:
    std::string title_;
    int height_;
    int width_;
    SDL_Window* window_ = nullptr;
    SDL_Renderer* renderer_ = nullptr;
};

#endif

