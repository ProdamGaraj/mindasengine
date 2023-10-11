package com.prodamgarage.mindasengine.repository;

import com.prodamgarage.mindasengine.models.News;
import com.prodamgarage.mindasengine.models.Photo;
import com.prodamgarage.mindasengine.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    void deleteById(Long id);
    List<Photo> findByProject(Project project);
    List<Photo> findByNews(News news);
}
