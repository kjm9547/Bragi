package com.inje.bragi.repository;

import com.inje.bragi.entity.Track;
import com.inje.bragi.entity.UploadImage;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UploadImageRepository extends JpaRepository<UploadImage, Long> {

    UploadImage findByTrack(Track track);
}
