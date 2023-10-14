package com.prodamgarage.mindasengine.controllers;

import com.prodamgarage.mindasengine.services.PhotoService;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/images")
public class ImageController {
    private final PhotoService photoService;
    public ImageController(PhotoService photoService) {
        this.photoService = photoService;
    }
    @Async
    @GetMapping(value = "/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> serveFile(@PathVariable String imageName) throws IOException {
        Resource resource = photoService.loadFileAsResource(imageName);
        return ResponseEntity.ok().body(resource.getContentAsByteArray());
    }
}



/*    @GetMapping("/news")
    public ResponseEntity<List<Resource>> getImageFromNews(@RequestBody News news) throws MalformedURLException {
        List<Resource> resources = new ArrayList<>();
        List<Photo> photos = photoRepository.findByNews(news);
        for (Photo photo : photos) {
            Resource resource = photoService.loadFileAsResource(photo.getFilename());
            resources.add(resource);
        }
        return ResponseEntity.ok().body(resources);
    }

    @GetMapping("/project")
    public ResponseEntity<List<ResourceWrapper>> getImageFromProject(@RequestBody Project project) throws IOException {
        List<ResourceWrapper> resources = new ArrayList<>();
        List<Photo> photos = photoRepository.findByProject(project);
        for (Photo photo : photos) {
            Resource resource = photoService.loadFileAsResource(photo.getFilename());
            resources.add(new ResourceWrapper(photo.getFilename(), resource.getURL().toString()));
        }
        return ResponseEntity.ok().body(resources);
    }*/
