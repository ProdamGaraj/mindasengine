package com.prodamgarage.mindasengine.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PostService<T> {
    void save(T object, List<MultipartFile> fileList) throws IOException;
    void delete(Long id);
    List<?> getAll();
    void update(T object, List<MultipartFile> files, Long id) throws IOException;
}