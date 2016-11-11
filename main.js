var source = $("#entry-template").html();
var template = Handlebars.compile(source);



function my_notes() {
    $.getJSON('https://infinite-mountain-44724.herokuapp.com/api/notes')
        .then(function(response) {
            return response.notes.forEach(function(note) {
                var display_notes = template(note)
                $('#alpha').prepend(display_notes)
            })
        })
}

my_notes()

function chat(response) {
  var display_note = template(response)
  $('#alpha').prepend(display_notes)
  clear_form('#create')
}


$('#create').on('submit', function(ev){
  alert("hi")
  ev.preventDefault()
    var new_post = $(this).serializeArray()
    $.post(
      {
        url: 'https://infinite-mountain-44724.herokuapp.com/api/notes',
        data: new_post
      }).done(function(response){
        chat(response)
    })
})
  // New Post Form ends here
