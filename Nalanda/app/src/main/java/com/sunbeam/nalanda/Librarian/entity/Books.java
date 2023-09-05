package com.sunbeam.nalanda.Librarian.entity;

import java.io.Serializable;


public class Books implements Serializable {
    private int idBooks;
    private String booksName;
    private String bookAuthor;
    private double bookPrice;
    private String bookDesc;
    private String bookImg;
    private int idCategory;
    private int available_copies;
    private String bookCategoryName;

    public Books() {
    }

    public Books(int idBooks, String booksName, String bookAuthor, double bookPrice, String bookDesc, String bookImg, int idCategory, int available_copies,String bookCategoryName ) {
        this.idBooks = idBooks;
        this.booksName = booksName;
        this.bookAuthor = bookAuthor;
        this.bookPrice = bookPrice;
        this.bookDesc = bookDesc;
        this.bookImg = bookImg;
        this.idCategory = idCategory;
        this.available_copies = available_copies;
        this.bookCategoryName = bookCategoryName;
    }


    public int getIdBooks() {
        return idBooks;
    }

    public void setIdBooks(int idBooks) {
        this.idBooks = idBooks;
    }

    public String getBooksName() {
        return booksName;
    }

    public void setBooksName(String booksName) {
        this.booksName = booksName;
    }

    public String getBookAuthor() {
        return bookAuthor;
    }

    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }

    public double getBookPrice() {
        return bookPrice;
    }

    public void setBookPrice(double bookPrice) {
        this.bookPrice = bookPrice;
    }

    public String getBookDesc() {
        return bookDesc;
    }

    public void setBookDesc(String bookDesc) {
        this.bookDesc = bookDesc;
    }

    public String getBookImg() {
        return bookImg;
    }

    public void setBookImg(String bookImg) {
        this.bookImg = bookImg;
    }

    public int getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(int idCategory) {
        this.idCategory = idCategory;
    }

    public int getAvailable_copies() {
        return available_copies;
    }

    public void setAvailable_copies(int available_copies) {
        this.available_copies = available_copies;
    }

    public String getBookCategoryName() {
        return bookCategoryName;
    }

    public void setBookCategoryName(String bookCategoryName) {
        this.bookCategoryName = bookCategoryName;
    }

    @Override
    public String toString() {
        return "Books{" +
                "idBooks=" + idBooks +
                ", booksName='" + booksName + '\'' +
                ", bookAuthor='" + bookAuthor + '\'' +
                ", bookPrice=" + bookPrice +
                ", bookDesc='" + bookDesc + '\'' +
                ", bookImg='" + bookImg + '\'' +
                ", idCategory=" + idCategory +
                ", available_copies=" + available_copies +
                ", bookCategoryName='" + bookCategoryName + '\'' +
                '}';
    }
}
