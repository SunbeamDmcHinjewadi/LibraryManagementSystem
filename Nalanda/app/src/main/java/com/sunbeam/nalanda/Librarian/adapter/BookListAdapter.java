package com.sunbeam.nalanda.Librarian.adapter;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.sunbeam.nalanda.Librarian.activity.BookDetailsActivity;
import com.sunbeam.nalanda.Librarian.entity.Books;
import com.sunbeam.nalanda.Librarian.utils.API;
import com.sunbeam.nalanda.R;

import java.util.List;

public class BookListAdapter extends RecyclerView.Adapter<BookListAdapter.MyViewHolder>{

    Context context;
    List<Books> listBooks;

    public BookListAdapter(Context context, List<Books> listBooks) {
        this.context = context;
        this.listBooks = listBooks;
    }

    @NonNull
    @Override
    public BookListAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.books_list,null);
        return new MyViewHolder(view);
    }


    @Override
    public void onBindViewHolder(@NonNull BookListAdapter.MyViewHolder holder, int position) {
        Books books = listBooks.get(position);
       // Glide.with(context).load("http://192.168.163.150:4000"+books.getBookImg()).into(holder.image);
        Glide.with(context).load(API.BASE_URL+"/"+books.getBookImg()).into(holder.image);
        holder.textBookName.setText(books.getBooksName());
        holder.textBookAuthor.setText(books.getBookAuthor());
        holder.textBookCategory.setText(books.getBookCategoryName());

    }

    @Override
    public int getItemCount() {
        return listBooks.size();
    }




    class MyViewHolder extends RecyclerView.ViewHolder{
        ImageView image;
        TextView textBookName,textBookAuthor,textBookCategory;
        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            image = itemView.findViewById(R.id.imageBook);
            textBookName = itemView.findViewById(R.id.textBookName);
            textBookAuthor = itemView.findViewById(R.id.textBookAuthor);
            textBookCategory = itemView.findViewById(R.id.textBookCategory);
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent intent = new Intent(context, BookDetailsActivity.class);
                    intent.putExtra("library", listBooks.get(getAdapterPosition()));
                    context.startActivity(intent);
                }
            });
        }
    }



}
