package com.hedvig.app.react;

import android.os.Bundle;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.widget.FrameLayout;
import com.hedvig.app.R;

public class ReactTestActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        FrameLayout view = new FrameLayout(this) {
            @Override
            protected void onAttachedToWindow() {
                super.onAttachedToWindow();
                FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
                transaction.add(R.id.chatFragment, new ChatFragment());
                transaction.commitAllowingStateLoss();
            }
        };

        view.setId(R.id.chatFragment);
        setContentView(view);
    }
}
