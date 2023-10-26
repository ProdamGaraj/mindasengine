package com.prodamgarage.mindasengine.controllers;

import com.prodamgarage.mindasengine.services.PhotoService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImageController {
    private final PhotoService photoService;
    private static final Logger logger = LoggerFactory.getLogger(ImageController.class);

    @GetMapping(value = "/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> serveFile(@PathVariable String imageName) throws IOException {
        try {
            Resource resource = photoService.loadFileAsResource(imageName);
            return ResponseEntity.ok().body(resource.getContentAsByteArray());
        } catch (FileNotFoundException e) {
            logger.error("File not found: " + imageName + " " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}
