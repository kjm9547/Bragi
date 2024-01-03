package com.inje.bragi.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record MemberUpdateRequest(
        @Schema(description = "회원 비밀번호", example = "1234")
        String password,
        @Schema(description = "회원 새 비밀번호", example = "1234")
        String newPassword,
        @Schema(description = "회원 이름", example = "고동민")
        String name,
        @Schema(description = "회원 나이", example = "23")
        Integer age
) {
}
