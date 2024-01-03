package com.inje.bragi.dto.response;

import com.inje.bragi.entity.Board;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class BoardResponse {
    private Long id;
    private String title;
    private String body;
    private String memberName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private Integer likeCount;
    private List<CommentResponse> commentList;
    private String memberProfileUrl;
    private String musicArtist;

    private String musicTitle;

    private String musicUrl;

    private String image;

    @Builder
    private BoardResponse(Board entity, List<CommentResponse> list) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.body = entity.getBody();
        this.memberName = entity.getMember().getName();
        this.createdAt = entity.getCreatedAt();
        this.modifiedAt = entity.getLastModifiedAt();
        this.likeCount = entity.getLikes() != null ? entity.getLikes().size() : 0;
        this.commentList = list;
        this.memberProfileUrl = entity.getMemberProfileUrl();
        this.musicTitle = entity.getMusicTitle();
        this.musicUrl = entity.getMusicUrl();
        this.musicArtist = entity.getMusicArtist();
        this.image = entity.getImage();
    }

    private BoardResponse(Board entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.body = entity.getBody();
        this.memberName = entity.getMember().getName();
        this.createdAt = entity.getCreatedAt();
        this.modifiedAt = entity.getLastModifiedAt();
        this.likeCount = entity.getLikes() != null ? entity.getLikes().size() : 0;
        this.commentList = entity.getComments().stream().map(CommentResponse::from).toList();
        this.memberProfileUrl = entity.getMemberProfileUrl();
        this.musicTitle = entity.getMusicTitle();
                this.musicUrl = entity.getMusicUrl();
                this.musicArtist = entity.getMusicArtist();
        this.image = entity.getImage();
    }

    public static BoardResponse from(Board entity, List<CommentResponse> list) {
        return BoardResponse.builder()
                .entity(entity)
                .list(list)
                .build();
    }

    public static BoardResponse from(Board entity) {
        return new BoardResponse(entity);
    }

}
