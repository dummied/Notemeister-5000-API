$(document).ready(function(){
  if(window.location.hash.match(/#\d+/).length > 0) {
    id = window.location.hash.substring(1);
    $.getJSON('https://infinite-mountain-44724.herokuapp.com/api/notes/' + id)
    .then(function(response){
      console.log(response.note)
      var display_modal = modal_template(response.note)
      $('#beta').append(display_modal)
      $('#note_modal').modal('show')
    })
  }
})

var modal_source = $("#modal-template").html();
var modal_template = Handlebars.compile(modal_source);


var source = $("#entry-template").html();
var template = Handlebars.compile(source);



function my_notes() {
    $.getJSON('https://infinite-mountain-44724.herokuapp.com/api/notes/')
        .then(function(response) {
            return response.notes.forEach(function(note) {
                var display_notes = template(note)
                $('#alpha').prepend(display_notes)
            })
        })
}

my_notes()

function clear_form(selector) {
    $(selector)[0].reset();
}


function chat(response) {
    var display_notes = template(response.note)
    $('#alpha').prepend(display_notes)
    clear_form('#create')
}


$('#create').on('submit', function(ev) {
        ev.preventDefault()
        var new_post = $(this).serializeArray()
        $.post({
            url: 'https://infinite-mountain-44724.herokuapp.com/api/notes/',
            data: new_post
        }).done(function(response) {
            chat(response)
        })
    })
    // New Post Form ends here


$('#alpha').on('click', '.tag', function(ev) {
    ev.preventDefault();
    $('#alpha').html("");
    $.getJSON('https://infinite-mountain-44724.herokuapp.com/api/notes/tag/' + encodeURIComponent($(this).html()))
        .then(function(response) {
            $('#header').html('')
            $('#header').append('Notemeister 5000: ' + response.tag.name);
            return response.tag.notes.forEach(function(note) {
                var display_notes = template(note)
                $('#alpha').prepend(display_notes)
            })
        })
})
