package com.inje.bragi.dto.response;

import com.inje.bragi.entity.Mp3;
import com.inje.bragi.entity.Track;
import lombok.Builder;
import lombok.Getter;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Getter
public class TrackResponse {
    private BigInteger id;
    private String title;
    private String body;
    private String memberName;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    private String image;

    private String musicUrl;

    @Builder
    private TrackResponse(Track entity, Mp3 mp3) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.body = entity.getBody();
        this.memberName = entity.getMember().getName();
        this.createdAt = entity.getCreatedAt();
        this.modifiedAt = entity.getLastModifiedAt();
        this.musicUrl = mp3.getUrl();
        if (mp3 != null) {
            this.musicUrl = mp3.getUrl();
        } else {
            this.musicUrl = null; // Mp3 객체가 null인 경우 musicUrl을 null로 설정합니다.
        }
    }

    @Builder
    private TrackResponse(Track entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.body = entity.getBody();
        this.memberName = entity.getMember().getName();
        this.createdAt = entity.getCreatedAt();
        this.modifiedAt = entity.getLastModifiedAt();

        if (entity.getMp3() != null) {
            this.musicUrl = entity.getMp3().getUrl();
        } else {
            this.musicUrl = null; // Mp3 객체가 null인 경우 musicUrl을 null로 설정합니다.
        }

    }


    public static TrackResponse from(Track entity, Mp3 mp3) {
        return new TrackResponse(entity, mp3);
    }

    public static TrackResponse from(Track entity) {
        return new TrackResponse(entity);
    }
}
