package com.prodamgarage.mindasengine.controllers;

import com.prodamgarage.mindasengine.dto.ResourceWrapper;
import com.prodamgarage.mindasengine.models.News;
import com.prodamgarage.mindasengine.models.Photo;
import com.prodamgarage.mindasengine.models.Project;
import com.prodamgarage.mindasengine.repository.PhotoRepository;
import com.prodamgarage.mindasengine.services.PhotoService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/images")
public class ImageController {
    @Value("${upload.path}")
    private String uploadPath;
    private final ResourceLoader resourceLoader;
    private final PhotoRepository photoRepository;
    private final PhotoService photoService;

    public ImageController(ResourceLoader resourceLoader, PhotoRepository photoRepository, PhotoService photoService) {
        this.resourceLoader = resourceLoader;
        this.photoRepository = photoRepository;
        this.photoService = photoService;
    }
/*    @GetMapping("/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        Resource resource = resourceLoader.getResource(uploadPath + "/" + imageName);
        return ResponseEntity.ok().body(resource);
    }*/
    @Async
    @GetMapping(value = "/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> serveFile(@PathVariable String imageName) throws IOException {
        Resource resource = photoService.loadFileAsResource(imageName);
        return ResponseEntity.ok().body(resource.getContentAsByteArray());
    }

    @GetMapping(value = "/system", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Resource> serveSystemFile() throws IOException {
        final ByteArrayResource inputStream = new ByteArrayResource(Files.readAllBytes(Paths.get(uploadPath +
                "/35a8b619-ea29-48f0-906d-90943a16e3b0.Лаб_1.png"
        )));
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.IMAGE_PNG)
                .contentLength(inputStream.contentLength())
                .body(inputStream);
    }

    @GetMapping("/news")
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
    }
}
