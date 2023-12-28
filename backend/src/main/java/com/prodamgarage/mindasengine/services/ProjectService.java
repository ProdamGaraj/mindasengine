package com.prodamgarage.mindasengine.services;

import com.prodamgarage.mindasengine.dto.ProjectResponse;
import com.prodamgarage.mindasengine.models.Photo;
import com.prodamgarage.mindasengine.models.Project;
import com.prodamgarage.mindasengine.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService implements PostService<Project> {
    private final ProjectRepository projectRepository;
    private final PhotoService photoService;

    @Override
    public void save(Project project, List<MultipartFile> fileList) throws IOException {
        projectRepository.save(project);
        photoService.savePhotos(project, fileList);
    }
    @Override
    public void delete(Long id) {
        Project project = projectRepository.findById(id).orElseThrow();
        photoService.deletePhotos(project);
        projectRepository.deleteById(id);
    }
    @Override
    public List<ProjectResponse> getAll() {
        List<ProjectResponse> projectsWithFiles = new ArrayList<>();
        Iterable<Project> projects = projectRepository.findAll();
        for (Project project : projects) {
            List<Photo> photos = photoService.getPhotosByObject(project);
            projectsWithFiles.add(new ProjectResponse(project, photos.stream().map(Photo::getFilename).toList()));
        }
        return projectsWithFiles;
    }
    @Override
    public void update(Project project, List<MultipartFile> files, Long id) throws IOException {
        Project projectFromDb = projectRepository.findById(id).orElseThrow();
        projectFromDb.setName(project.getName());
        projectFromDb.setDescription(project.getDescription());
        if(files != null) {
            photoService.deletePhotos(projectFromDb);
            projectRepository.save(projectFromDb);
            photoService.savePhotos(projectFromDb, files);
            return;
        }
        projectRepository.save(projectFromDb);
    }
}