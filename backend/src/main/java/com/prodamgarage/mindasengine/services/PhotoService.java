package com.prodamgarage.mindasengine.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class PhotoService {
    @Value("${upload.path}")
    private String uploadPath;

    public Resource loadFileAsResource(String filename) throws MalformedURLException {
        Path fileStorageLocation = Paths.get(uploadPath).toAbsolutePath().normalize();
        Path filePath = fileStorageLocation.resolve(filename).normalize();
        return new UrlResource(filePath.toUri());
    }
}
