cmake_minimum_required(VERSION 3.10)
project(chess_game)

# Specify C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Manually set SDL2 and SDL2_image paths
set(SDL2_INCLUDE_DIR "/Library/Frameworks/SDL2.framework/Headers")
set(SDL2_LIBRARY "/Library/Frameworks/SDL2.framework")
set(SDL2_IMAGE_INCLUDE_DIR "/Library/Frameworks/SDL2_image.framework/Headers")
set(SDL2_IMAGE_LIBRARY "/Library/Frameworks/SDL2_image.framework")

# Include SDL2 and SDL2_image headers
include_directories(${SDL2_INCLUDE_DIR} ${SDL2_IMAGE_INCLUDE_DIR})

# Add all your source files here
add_executable(chess_game main.cpp Window.cpp Board.cpp Move.cpp)

# Link against SDL2 and SDL2_image framework directly
target_link_libraries(chess_game "${SDL2_LIBRARY}" "${SDL2_IMAGE_LIBRARY}")
