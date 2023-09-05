package com.sunbeam.nalanda.Librarian.activity;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.DatePicker;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.google.gson.JsonObject;
import com.sunbeam.nalanda.Librarian.adapter.BookListAdapter;
import com.sunbeam.nalanda.Librarian.entity.Books;
import com.sunbeam.nalanda.Librarian.entity.Transaction;
import com.sunbeam.nalanda.Librarian.utils.API;
import com.sunbeam.nalanda.Librarian.utils.RetrofitClient;
import com.sunbeam.nalanda.R;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;


import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class BookDetailsActivity extends AppCompatActivity {

        TextView textName,textAuthor,textCategory,textDescription,textAvailableCopy;
        ImageView imageBooks;
        Books books;
        DatePicker datePicker;
        BookListAdapter bookListAdapter;
        List<Books> listBooks;
        int bid;



    @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_book_details);
            textName = findViewById(R.id.textName);
            textAuthor = findViewById(R.id.textAuthor);
            textCategory = findViewById(R.id.textCategory);
            textDescription = findViewById(R.id.textDescription);
            textAvailableCopy = findViewById(R.id.textAvailableCopy);
            imageBooks = findViewById(R.id.imageBooks);
            datePicker = findViewById(R.id.datePicker);
            books =(Books) getIntent().getSerializableExtra("library");


            getBooksDetails();


        }






    private void getBooksDetails() {
        textName.setText("Name : "+books.getBooksName());
        textAuthor.setText("Author : "+books.getBookAuthor());
        textCategory.setText("Category: "+books.getBookCategoryName());
        textDescription.setText("Description: "+books.getBookDesc());
        textAvailableCopy.setText("No. of Copies: "+books.getAvailable_copies());

        Glide.with(this).load(API.BASE_URL+"/"+books.getBookImg()).into(imageBooks);
    }



    public void issue_book(View view) throws ParseException {

        int day = datePicker.getDayOfMonth();
        int month = datePicker.getMonth();
        int year = datePicker.getYear();


        Calendar calendar = Calendar.getInstance();
        calendar.set(year, month, day);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        int uid = getSharedPreferences("libraryM",MODE_PRIVATE).getInt("uID",0);
        bid  = books.getIdBooks();
        Transaction transaction = new Transaction();
        transaction.setUser_id(uid);
        transaction.setBook_id(bid);
        try {

            String formattedDate = sdf.format(calendar.getTime());
            Date date = sdf.parse(formattedDate);
            java.sql.Date sqlDueDate = new java.sql.Date(date.getTime());
            transaction.setDue_date(sqlDueDate); // Set the Date object in the Transaction

        } catch (ParseException e) {
            e.printStackTrace();
        }



        RetrofitClient.getInstance().getApi().issueNewBook(transaction).enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if(response.body().getAsJsonObject().get("status").getAsString().equals("success")){
                    //ask to mam

                    Toast.makeText(BookDetailsActivity.this, "Issued New Book", Toast.LENGTH_SHORT).show();
                    finish();

                }

            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
                Toast.makeText(BookDetailsActivity.this, "Something went wrong", Toast.LENGTH_SHORT).show();
            }
        });


    }
    @Override
    protected void onResume() {
        super.onResume();
        removeIssuedBookFromList(bid);

        getBooksDetails();
    }


        @Override
        public boolean onOptionsItemSelected(@NonNull MenuItem item) {
            finish();
            return super.onOptionsItemSelected(item);
        }

        //removing the book if it is issued
    private void removeIssuedBookFromList(int bid) {
        if (listBooks != null && bookListAdapter != null) {
            int position = listBooks.indexOf(bid);
            if (position != -1) {
                listBooks.remove(position);
                bookListAdapter.notifyDataSetChanged(); // Notify the adapter that data has changed
            }


}}}
