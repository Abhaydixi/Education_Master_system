jQuery.validator.addMethod("lettersonly", function (value, element) {
    return this.optional(element) || /^[a-z\s]+$/i.test(value);
}, "Only alphabetical characters");

$("#studentForm").validate({
    rules: {
        name: {
            required: true,
            lettersonly: true,
            minlength: 3
        },
        email: {
            required: true,
            email: true
        },
        phone: {
            required: true,
            digits: true,
            number: true,
            minlength: 10

            // maxlength: 10
        },
    },
    messages: {
        name: {
            required: 'The Name field is required',
            minlength: 'You must enter at least 3 characters',
            lettersonly: "letters only allow"
        },
        email: {
            required: 'The Email field is required',
            email: 'You must enter a valid email address'
        },

        phone: {
            required: "Please Enter Your Mobile Number",
            number: "Please enter numbers Only",
            minlength: 'min and max 10 digits number',
            maxlength: 'min and max 10 digits number',

        },

    },

    // submitHandler: function (form) {
    //     alert("Submitted");
    //     form.submit();
    // }
})