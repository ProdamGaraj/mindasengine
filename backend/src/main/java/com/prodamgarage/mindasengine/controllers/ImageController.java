package com.prodamgarage.mindasengine.controllers;

import com.prodamgarage.mindasengine.services.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/images")
public class ImageController {
    @Autowired
    PhotoService photoService;
    //TODO: Add INFO for NotFoundException
    @GetMapping(value = "/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> serveFile(@PathVariable String imageName) throws IOException {
        Resource resource = photoService.loadFileAsResource(imageName);
        return ResponseEntity.ok().body(resource.getContentAsByteArray());
    }
}
