package com.prodamgarage.mindasengine.services;

import com.prodamgarage.mindasengine.dto.NewsResponse;
import com.prodamgarage.mindasengine.models.News;
import com.prodamgarage.mindasengine.models.Photo;
import com.prodamgarage.mindasengine.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class NewsService {
    //TODO:Change Autowired
    @Autowired
    NewsRepository newsRepository;
    @Autowired
    PhotoService photoService;

    public void saveNews(News news, List<MultipartFile> fileList) throws IOException {
        newsRepository.save(news);
        photoService.savePhotos(news, fileList);
    }

    public void deleteNews(Long id) {
        News news = newsRepository.findById(id).orElseThrow();
        photoService.deletePhotos(news);
        newsRepository.deleteById(id);
    }

    public List<NewsResponse> getAllNews() {
        LocalDate currentDate = LocalDate.now();
        List<NewsResponse> response = new ArrayList<>();
        Iterable<News> newsList = newsRepository.findByPublicationLessThanEqual(currentDate);
        for (News news : newsList) {
            List<Photo> photos = photoService.getPhotosByObject(news);
            response.add(new NewsResponse(news, photos.stream().map(Photo::getFilename).toList()));
        }
        return response;
    }

    public void updateNews(News news, List<MultipartFile> files, Long id) throws IOException {
        News newsFromDb = newsRepository.findById(id).orElseThrow();
        newsFromDb.setName(news.getName());
        newsFromDb.setDescription(news.getDescription());
        newsFromDb.setPublication(news.getPublication());

        if (files != null) {
            photoService.deletePhotos(newsFromDb);
            newsRepository.save(newsFromDb);
            photoService.savePhotos(newsFromDb, files);
            return;
        }
        newsRepository.save(newsFromDb);
    }
}
