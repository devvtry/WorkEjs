$(document).ready(function () {
    $('.deleteUser').on('click', _deleteUser)
})

function _deleteUser() {
    const confirmation = confirm('Are you Sure')
    if (confirmation) {
        // alert(true);
        $.ajax({
            type: 'DELETE',
            url: '/users/delete/' + $(this).data('id')
        }).done((response) => {
            window.location.replace('/')
        })
        window.location.replace('/')
    } else {
        alert(false);
    }
}

// using .(dot) read class from files like ln 1,11