package com.prodamgarage.mindasengine.services;

import com.prodamgarage.mindasengine.dto.NewsDTO;
import com.prodamgarage.mindasengine.models.Photo;
import com.prodamgarage.mindasengine.models.News;
import com.prodamgarage.mindasengine.repository.NewsRepository;
import com.prodamgarage.mindasengine.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@Service
public class NewsService {
    @Value("${upload.path}")
    private String uploadPath;
    private final NewsRepository newsRepository;
    private final PhotoRepository photoRepository;

    public NewsService(NewsRepository newsRepository, PhotoRepository photoRepository) {
        this.newsRepository = newsRepository;
        this.photoRepository = photoRepository;
    }

    public void saveNews(News news, List<MultipartFile> fileList) throws IOException {
        newsRepository.save(news);
        if (fileList != null) {
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            for (MultipartFile file : fileList) {
                String uuidFile = UUID.randomUUID().toString();
                String resultFilename = uuidFile + "." + file.getOriginalFilename();
                file.transferTo(new File(uploadPath + "/" + resultFilename));
                Photo photo = new Photo(resultFilename, null, news);
                photoRepository.save(photo);
            }
        }
    }

    public void deleteNews(Long id) {
        List<Photo> photos = photoRepository.findAll();
        for (Photo photo : photos) {
            Optional<News> news = newsRepository.findById(id);
            if (news.isPresent()) {
                if (news.get() == photo.getNews()) {
                    File fileToDelete = new File(uploadPath + "/" + photo.getFilename());
                    if (fileToDelete.exists()) {
                        fileToDelete.delete();
                    }
                }
            }
        }
        newsRepository.deleteById(id);
    }

    public List<NewsDTO> getAllNews() {
        LocalDate currentDate  = LocalDate.now();
        List<NewsDTO> newssWithFiles = new ArrayList<>();
        Iterable<News> newss = newsRepository.findByPublicationLessThanEqual(currentDate);
        for (News news : newss) {
            List<Photo> photos = photoRepository.findByNews(news);
            newssWithFiles.add(new NewsDTO(news, photos.stream().map(Photo::getFilename).toList()));
        }
        return newssWithFiles;
    }

    public void updateNews(News news, List<MultipartFile> files, Long id) {
        News newsFromDb = newsRepository.findById(id).orElseThrow();
        newsFromDb.setName(news.getName());
        newsFromDb.setDescription(news.getDescription());
        newsFromDb.setPublication(news.getPublication());
        if (files != null) {
            List<Photo> photos = photoRepository.findAll();
            for (Photo photo : photos) {
                if (news == photo.getNews()) {
                    File fileToDelete = new File(uploadPath + "/" + photo.getFilename());
                    if (fileToDelete.exists()) {
                        fileToDelete.delete();
                    }
                }
            }
        }
        newsRepository.save(newsFromDb);
    }
}
