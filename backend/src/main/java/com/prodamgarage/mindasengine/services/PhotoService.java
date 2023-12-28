package com.prodamgarage.mindasengine.services;

import com.prodamgarage.mindasengine.models.News;
import com.prodamgarage.mindasengine.models.Photo;
import com.prodamgarage.mindasengine.models.Project;
import com.prodamgarage.mindasengine.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PhotoService {
    @Value("${upload.path}")
    private String uploadPath;
    private final PhotoRepository photoRepository;
    public Resource loadFileAsResource(String filename) throws MalformedURLException {
        Path fileStorageLocation = Paths.get(uploadPath).toAbsolutePath().normalize();
        Path filePath = fileStorageLocation.resolve(filename).normalize();
        return new UrlResource(filePath.toUri());
    }
    public void savePhotos(Object entity, List<MultipartFile> files) throws IOException {
        if (files != null) {
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            for (MultipartFile file : files) {
                String uuidFile = UUID.randomUUID().toString();
                String resultFilename = uuidFile + "." + file.getOriginalFilename();
                file.transferTo(new File(uploadPath + "/" + resultFilename));
                Photo photo = switch (entity.getClass().getSimpleName()) {
                    case "News" -> new Photo(resultFilename, null, (News) entity);
                    case "Project" -> new Photo(resultFilename, (Project) entity, null);
                    default -> throw new IllegalArgumentException("Unsupported entity type" + entity.getClass().getSimpleName());
                };
                photoRepository.save(photo);
            }
        }
    }
    public void deletePhotos(Object entity) {
        List<Photo> photos = photoRepository.findAll();
        for (Photo photo : photos) {
            if ((entity instanceof News && entity == photo.getNews()) ||
                    (entity instanceof Project && entity == photo.getProject())) {
                File fileToDelete = new File(uploadPath + "/" + photo.getFilename());
                if (fileToDelete.exists()) {
                    fileToDelete.delete();
                    photoRepository.deleteById(photo.getId());
                }
            }
        }
    }
    public List<Photo> getPhotosByObject(Object entity) {
        return switch (entity.getClass().getSimpleName()) {
            case "News" -> photoRepository.findByNews((News) entity);
            case "Project" -> photoRepository.findByProject((Project) entity);
            default -> throw new IllegalArgumentException("Unsupported entity type");
        };
    }
}
