package com.inje.bragi.controller;


import com.inje.bragi.dto.ApiResponse;
import com.inje.bragi.dto.request.BoardCreateRequest;
import com.inje.bragi.service.BoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigInteger;

@Tag(name = "피드 관련 api")
@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @Operation(summary = "피드 작성")
    @PostMapping("/write")
    public ApiResponse boardWrite(@RequestBody BoardCreateRequest req, @AuthenticationPrincipal User user) throws IOException {
        return ApiResponse.success(boardService.writeBoard(req, new BigInteger(user.getUsername())));
    }
    @Operation(summary = "전체 피드 조회")
    @GetMapping("/posts")
    public ApiResponse getPosts() {
        return ApiResponse.success(boardService.getPosts());
    }

    @Operation(summary = "피드 수정")
    @PutMapping("/api/post/{boardId}")
    public ApiResponse updatePost(@PathVariable Long boardId, @RequestBody BoardCreateRequest requestsDto, @AuthenticationPrincipal User user) {
        return ApiResponse.success(boardService.updatePost(boardId, requestsDto, new BigInteger(user.getUsername())));
    }

    @Operation(summary = "피드 삭제")
    @DeleteMapping("/api/post/{boardId}")
    public ApiResponse deletePost(@PathVariable Long boardId, @AuthenticationPrincipal User user) {
        return ApiResponse.success(boardService.deletePost(boardId, new BigInteger(user.getUsername())));
    }
}
