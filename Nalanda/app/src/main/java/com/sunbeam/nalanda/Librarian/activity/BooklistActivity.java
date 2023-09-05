package com.sunbeam.nalanda.Librarian.activity;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.os.Bundle;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sunbeam.nalanda.Librarian.adapter.BookListAdapter;
import com.sunbeam.nalanda.Librarian.entity.Books;
import com.sunbeam.nalanda.Librarian.entity.User;
import com.sunbeam.nalanda.Librarian.utils.RetrofitClient;
import com.sunbeam.nalanda.R;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class BooklistActivity extends AppCompatActivity {
    RecyclerView recyclerView;
    BookListAdapter bookListAdapter;
    List<Books> listBooks;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_list);
        recyclerView = findViewById(R.id.recyclerView);
        listBooks = new ArrayList<>();
        bookListAdapter = new BookListAdapter(this,listBooks);
        recyclerView.setAdapter(bookListAdapter);
        recyclerView.setLayoutManager(new GridLayoutManager(this,1));
        getBookData();
    }

    void getBookData(){

        RetrofitClient.getInstance().getApi().getAllBooks().enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if(response.body().getAsJsonObject().get("status").getAsString().equals("success")){
                    JsonArray jsonArray = response.body().getAsJsonObject().get("data").getAsJsonArray();
                    for (JsonElement element :jsonArray) {
                        Books books = new Books();
                        books.setIdBooks(element.getAsJsonObject().get("idBooks").getAsInt());
                        books.setBooksName(element.getAsJsonObject().get("booksName").getAsString());
                        books.setBookAuthor(element.getAsJsonObject().get("bookAuthor").getAsString());
                        books.setBookDesc(element.getAsJsonObject().get("bookDesc").getAsString());
                        books.setBookImg( element.getAsJsonObject().get("bookImg").getAsString());
                        books.setIdCategory(element.getAsJsonObject().get("idCategory").getAsInt());
                        books.setAvailable_copies(element.getAsJsonObject().get("available_copies").getAsInt());
                        books.setBookCategoryName( element.getAsJsonObject().get("categoryName").getAsString());

                        listBooks.add(books);
 }
                    bookListAdapter.notifyDataSetChanged();
                }

            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Toast.makeText(BooklistActivity.this, "Something Went Wrong", Toast.LENGTH_SHORT).show();
            }
        });
    }


}