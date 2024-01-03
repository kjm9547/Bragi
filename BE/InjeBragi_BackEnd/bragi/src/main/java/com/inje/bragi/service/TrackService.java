package com.inje.bragi.service;

import com.inje.bragi.common.MemberType;
import com.inje.bragi.dto.request.TrackCreateRequest;
import com.inje.bragi.dto.response.TrackResponse;
import com.inje.bragi.entity.Member;
import com.inje.bragi.entity.Mp3;
import com.inje.bragi.entity.Track;
import com.inje.bragi.entity.enumSet.ErrorType;
import com.inje.bragi.handler.RestApiException;
import com.inje.bragi.repository.MemberRepository;
import com.inje.bragi.repository.Mp3Repository;
import com.inje.bragi.repository.TrackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TrackService {

    private final TrackRepository trackRepository;
    private final MemberRepository memberRepository;
    private final Mp3Repository mp3Repository;
    String notExist = "계정이 존재하지 않습니다.";

    @Value("${file.profileImagePath2}")
    private String uploadFolder;

    @Transactional
    public BigInteger writeTrack(TrackCreateRequest req, BigInteger account) {
        Member loginUser = memberRepository.findById(account)
                .orElseThrow(() -> new UsernameNotFoundException(notExist));

        MultipartFile file = req.getFile();
        UUID uuid = UUID.randomUUID();
        String imageFileName = uuid + "_" + file.getOriginalFilename();
        File destinationFile = new File(uploadFolder + imageFileName);

        try {
            file.transferTo(destinationFile);

            Mp3 mp3 = mp3Repository.findByTrackId(loginUser.getId());

            if (mp3 != null) {
                mp3.updateUrl(uploadFolder + imageFileName);
            } else {
                mp3 = Mp3.builder().url(uploadFolder + imageFileName).build();
            }

            Track track = trackRepository.save(Track.of(req, loginUser, mp3));
            mp3Repository.save(mp3);

            return track.getId();
        } catch (IOException e) {
            throw new RuntimeException("파일 업로드 중 오류 발생", e);
        }
    }


    @Transactional(readOnly = true)
    public List<TrackResponse> getPosts() {

        List<Track> trackList = trackRepository.findAllByOrderByLastModifiedAtDesc();
        List<TrackResponse> responseDtoList = new ArrayList<>();

        for (Track track : trackList) {
            responseDtoList.add(TrackResponse.from(track));
        }

        return responseDtoList;
    }

    @Transactional
    public TrackResponse updatePost(BigInteger id, TrackCreateRequest requestsDto, BigInteger account) {
        Member loginUser = memberRepository.findById(account).orElseThrow(() -> new UsernameNotFoundException(notExist));

        Optional<Track> Track = trackRepository.findById(id);
        if (Track.isEmpty()) {
            throw new RestApiException(ErrorType.NOT_FOUND_WRITING);
        }

        Optional<Track> found = trackRepository.findByIdAndMember(id, loginUser);
        if (found.isEmpty() && loginUser.getType() == MemberType.USER) {
            throw new RestApiException(ErrorType.NOT_WRITER);
        }
        Track.get().update(requestsDto, loginUser);
        trackRepository.flush();

        return TrackResponse.from(Track.get());

    }

    @Transactional
    public TrackResponse deletePost(BigInteger id, BigInteger account) {
        Member loginUser = memberRepository.findById(account).orElseThrow(() -> new UsernameNotFoundException(notExist));

        Optional<Track> found = trackRepository.findById(id);
        if (found.isEmpty()) {
            throw new RestApiException(ErrorType.NOT_FOUND_WRITING);
        }

        Optional<Track> Track = trackRepository.findByIdAndMember(id, loginUser);
        if (Track.isEmpty() && loginUser.getType() == MemberType.USER) {
            throw new RestApiException(ErrorType.NOT_WRITER);
        }

        trackRepository.deleteById(id);

        return TrackResponse.from(Track.get());
    }
}
