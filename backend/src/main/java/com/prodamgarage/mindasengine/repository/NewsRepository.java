package com.prodamgarage.mindasengine.repository;

import com.prodamgarage.mindasengine.models.News;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface NewsRepository extends JpaRepository<News, Long> {
    Optional<News> findById(Long id);
    List<News> findByPublicationLessThanEqual(LocalDate date);
}
