package com.hedvig.app.feature.loggedin

import android.arch.lifecycle.ViewModelProviders
import android.content.Context
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.view.View
import androidx.navigation.findNavController
import com.hedvig.app.R
import com.hedvig.app.di.viewmodel.ViewModelFactory
import com.hedvig.app.util.extensions.proxyNavigate
import com.hedvig.app.util.extensions.view.updatePadding
import dagger.android.support.AndroidSupportInjection
import kotlinx.android.synthetic.main.app_bar.*
import javax.inject.Inject

abstract class BaseTabFragment : Fragment() {

    @Inject
    lateinit var viewModelFactory: ViewModelFactory

    lateinit var baseTabViewModel: BaseTabViewModel

    val navController by lazy { requireActivity().findNavController(R.id.rootNavigationHost) }

    override fun onAttach(context: Context?) {
        super.onAttach(context)
        AndroidSupportInjection.inject(this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setHasOptionsMenu(true)
        baseTabViewModel = requireActivity().run {
            ViewModelProviders.of(this, viewModelFactory).get(BaseTabViewModel::class.java)
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        toolbar.updatePadding(end = resources.getDimensionPixelSize(R.dimen.base_margin_double))
    }

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        inflater.inflate(R.menu.base_tab_menu, menu)
        super.onCreateOptionsMenu(menu, inflater)
    }

    override fun onOptionsItemSelected(item: MenuItem?): Boolean {
        baseTabViewModel.triggerFreeTextChat {
            navController.proxyNavigate(R.id.action_loggedInFragment_to_chatFragment, Bundle().apply {
                putBoolean("show_close", true)
            })
        }
        return true
    }
}
