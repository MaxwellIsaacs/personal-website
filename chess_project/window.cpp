#include "window.h"
#include "board.h"

Window::Window(const std::string& title, int width, int height)
    : title_(title), width_(width), height_(height), window_(nullptr), renderer_(nullptr) {}

Window::~Window() {
    if (renderer_) {
        SDL_DestroyRenderer(renderer_);
    }
    if (window_) {
        SDL_DestroyWindow(window_);
    }
    IMG_Quit();
    SDL_Quit();
}

bool Window::init() {
    // Initialize SDL
    if (SDL_Init(SDL_INIT_VIDEO) < 0) {
        SDL_Log("SDL could not initialize. SDL_Error: %s", SDL_GetError());
        return false;
    }

    // Create window
    window_ = SDL_CreateWindow(title_.c_str(),
                               SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED,
                               width_, height_,
                               SDL_WINDOW_SHOWN);
    if (!window_) {
        SDL_Log("Window could not be created. SDL_Error: %s", SDL_GetError());
        return false;
    }

    // Create renderer
    renderer_ = SDL_CreateRenderer(window_, -1, SDL_RENDERER_ACCELERATED);
    if (!renderer_) {
        SDL_Log("Renderer could not be created. SDL_Error: %s", SDL_GetError());
        return false;
    }

    return true;
}

void Window::clear() {
    SDL_SetRenderDrawColor(renderer_, 255, 255, 255, 255); // White background
    SDL_RenderClear(renderer_);
}

void Window::display() {
    SDL_RenderPresent(renderer_);
}


void Window::setDrawColor(SDL_Color color) {
    SDL_SetRenderDrawColor(renderer_, color.r, color.g, color.b, color.a);
}

void Window::drawRect(SDL_Rect rect) {
    SDL_RenderFillRect(renderer_, &rect);
}

SDL_Renderer* Window::getRenderer() {
    return this->renderer_;
}


void Window::drawPiece(Square& cell) {
    SDL_Texture* texture = cell.piece.photo;    
    SDL_RenderCopy(renderer_, texture, nullptr, &cell.r);
}
    
