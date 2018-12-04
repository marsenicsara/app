package com.hedvig.app;

import com.reactnativenavigation.NavigationActivity;
import io.branch.rnbranch.*;
import com.leo_pharma.analytics.SegmentModule;
import android.content.Intent;
import com.segment.analytics.Analytics;

public class MainActivity extends NavigationActivity {
    @Override
    protected void onStart() {
        super.onStart();
        SegmentModule.setup(this, BuildConfig.SEGMENT_ANDROID_WRITE_KEY, null);
        RNBranchModule.setRequestMetadata("$segment_anonymous_id",
                Analytics.with(this.getApplicationContext()).getAnalyticsContext().traits().anonymousId());
        RNBranchModule.initSession(getIntent().getData(), this);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }
}
