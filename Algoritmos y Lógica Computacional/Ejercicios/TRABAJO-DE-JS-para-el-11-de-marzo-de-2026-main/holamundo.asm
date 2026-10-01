; hola.asm — x86-64 Windows NASM
; syscall de Windows via Win32 API

bits 64
default rel

extern GetStdHandle
extern WriteConsoleA
extern ExitProcess

section .data
    msg db "Hola mundo!", 13, 10, 0
    msg_len equ $ - msg - 1

section .bss
    written resq 1          ; bytes escritos (output de WriteConsoleA)

section .text
global main

main:
    sub rsp, 40             ; shadow space obligatorio en Windows x64

    ; GetStdHandle(-11) → handle de stdout
    mov rcx, -11
    call GetStdHandle       ; rax = handle

    ; WriteConsoleA(handle, msg, len, &written, NULL)
    mov rcx, rax
    lea rdx, [msg]
    mov r8,  msg_len
    lea r9,  [written]
    mov qword [rsp+32], 0   ; 5to arg en stack
    call WriteConsoleA

    ; ExitProcess(0)
    xor rcx, rcx
    call ExitProcess