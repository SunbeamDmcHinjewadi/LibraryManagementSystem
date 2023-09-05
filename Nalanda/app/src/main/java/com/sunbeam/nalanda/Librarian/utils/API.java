package com.sunbeam.nalanda.Librarian.utils;

import com.google.gson.JsonObject;
import com.sunbeam.nalanda.Librarian.entity.Transaction;
import com.sunbeam.nalanda.Librarian.entity.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface API {

    String BASE_URL = "http://192.168.246.150:4000";


    @POST("/users/login/patron")
    Call<JsonObject> loginUser(@Body User user);

    @POST("/users/register")
    Call<JsonObject> registerUser(@Body User user);

    @GET("/books/all-books")
    Call<JsonObject> getAllBooks();


    @POST("/transaction/issue-new-book")
    Call<JsonObject> issueNewBook(@Body Transaction transaction);

    @GET("/users/get-user/{uID}")
    Call<JsonObject> getUserById(@Path("uID") int uid);

    @GET("/transaction/transaction-per-book-for-app/{uID}")
    Call<JsonObject> trasactionShow(@Path("uID") int uid);

    @PUT("/transaction/return-book-date/{books_taken}/{uID}/{bid}")
    Call<JsonObject> returnBook(@Path("books_taken") int bookIdTaken,@Path("uID") int uid,@Path("bid") int bid);

}
