require(['jquery', 'b.js'], function($, b) {
    $('.name').text(b.name)
    $('.age').text(b.getAge())
    console.log(b.name)
    console.log(b.getAge())
})