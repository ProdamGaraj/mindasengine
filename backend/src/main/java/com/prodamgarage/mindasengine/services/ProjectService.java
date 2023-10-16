package com.prodamgarage.mindasengine.services;

import com.prodamgarage.mindasengine.dto.ProjectResponse;
import com.prodamgarage.mindasengine.models.Photo;
import com.prodamgarage.mindasengine.models.Project;
import com.prodamgarage.mindasengine.repository.PhotoRepository;
import com.prodamgarage.mindasengine.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjectService {
    @Value("${upload.path}")
    private String uploadPath;
    private final ProjectRepository projectRepository;
    private final PhotoRepository photoRepository;

    public ProjectService(ProjectRepository projectRepository, PhotoRepository photoRepository) {
        this.projectRepository = projectRepository;
        this.photoRepository = photoRepository;
    }

    public void saveProject(Project project, List<MultipartFile> fileList) throws IOException {
        projectRepository.save(project);
        if (fileList != null) {
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            for (MultipartFile file : fileList) {
                String uuidFile = UUID.randomUUID().toString();
                String resultFilename = uuidFile + "." + file.getOriginalFilename();
                file.transferTo(new File(uploadPath + "/" + resultFilename));
                Photo photo = new Photo(resultFilename, project, null);
                photoRepository.save(photo);
            }
        }
    }

    public void deleteProject(Long id) {
        List<Photo> photos = photoRepository.findAll();
        for (Photo photo : photos) {
            Optional<Project> project = projectRepository.findById(id);
            if (project.isPresent()) {
                if (project.get() == photo.getProject()){
                    File fileToDelete = new File(uploadPath + "/" + photo.getFilename());
                    if (fileToDelete.exists()) {
                        fileToDelete.delete();
                    }
                }
            }
        }
        projectRepository.deleteById(id);
    }

    public List<ProjectResponse> getAllProjects() {
        List<ProjectResponse> projectsWithFiles = new ArrayList<>();
        Iterable<Project> projects = projectRepository.findAll();
        for (Project project : projects) {
            List<Photo> photos = photoRepository.findByProject(project);
            projectsWithFiles.add(new ProjectResponse(project, photos.stream().map(Photo::getFilename).toList()));
        }
        return projectsWithFiles;
    }

    public void updateProject(Project project, List<MultipartFile> files, Long id) throws IOException {
        Project projectFromDb = projectRepository.findById(id).orElseThrow();
        projectFromDb.setName(project.getName());
        projectFromDb.setDescription(project.getDescription());
        if(files != null) {
            List<Photo> photos = photoRepository.findAll();
            for (Photo photo : photos) {
                if (projectFromDb == photo.getProject()) {
                    File fileToDelete = new File(uploadPath + "/" + photo.getFilename());
                    if (fileToDelete.exists()) {
                        fileToDelete.delete();
                        photoRepository.deleteById(photo.getId());
                    }
                }
            }
            projectRepository.save(projectFromDb);
            for (MultipartFile file : files) {
                String uuidFile = UUID.randomUUID().toString();
                String resultFilename = uuidFile + "." + file.getOriginalFilename();
                file.transferTo(new File(uploadPath + "/" + resultFilename));
                Photo photo = new Photo(resultFilename, projectFromDb, null);
                photoRepository.save(photo);
            }
            return;
        }
        projectRepository.save(projectFromDb);
    }
}