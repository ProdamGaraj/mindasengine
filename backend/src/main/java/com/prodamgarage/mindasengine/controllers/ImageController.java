package com.prodamgarage.mindasengine.controllers;

import com.prodamgarage.mindasengine.models.News;
import com.prodamgarage.mindasengine.models.Photo;
import com.prodamgarage.mindasengine.models.Project;
import com.prodamgarage.mindasengine.repository.PhotoRepository;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/images")
public class ImageController {
    private final ResourceLoader resourceLoader;
    private final PhotoRepository photoRepository;

    public ImageController(ResourceLoader resourceLoader, PhotoRepository photoRepository) {
        this.resourceLoader = resourceLoader;
        this.photoRepository = photoRepository;
    }
    @GetMapping("/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        Resource resource = resourceLoader.getResource("classpath:/static/images/" + imageName);
        return ResponseEntity.ok().body(resource);
    }

    @GetMapping("/news")
    public ResponseEntity<List<Resource>> getImageFromNews(@RequestBody News news) {
        List<Resource> resources = new ArrayList<>();
        List<Photo> photos = photoRepository.findByNews(news);
        for (Photo photo : photos) {
            Resource resource = resourceLoader.getResource("classpath:/static/images/" + photo.getFilename());
            resources.add(resource);
        }
        return ResponseEntity.ok().body(resources);
    }

    @GetMapping("/project")
    public ResponseEntity<List<Resource>> getImageFromProject(@RequestBody Project project) {
        List<Resource> resources = new ArrayList<>();
        List<Photo> photos = photoRepository.findByProject(project);
        for (Photo photo : photos) {
            Resource resource = resourceLoader.getResource("classpath:/static/images/" + photo.getFilename());
            resources.add(resource);
        }
        return ResponseEntity.ok().body(resources);
    }
}
