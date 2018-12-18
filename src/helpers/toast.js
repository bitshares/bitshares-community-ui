import toastr from 'toastr'
import 'toastr/build/toastr.css'

// Show the close button
toastr.options.closeButton = true

// Hide / Show method
toastr.options.showMethod = 'slideDown'
toastr.options.closeMethod = 'fadeOut'

// Show a progress bar on each toaster, indicating the duration left to remain open
toastr.options.progressBar = true

// Prevent Duplicate Toasts
toastr.options.preventDuplicates = true

// Show the toaster in the bottom right hand corner
toastr.options.positionClass = 'toast-bottom-right'

export default {
  error(text) {
    toastr.error('error', text)
  },
  warning(text) {
    toastr.warning('warning', text)
  },
  success(text) {
    toastr.success('success', text)
  },
  info(text) {
    toastr.info('info', text)
  },
  alert(type, text) {
    alert({ type, text, position: 'bottom' })
  }
}
