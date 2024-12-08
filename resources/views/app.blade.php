<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>photo-gallery</title>
        <link rel="icon" href="../favicon.png">
        <meta name="title" content="photo-gallery">
        <meta name="description" content="A stylish photo gallery">
        <meta name="keywords" content="gallery, photos">
        <meta name="author" content="Roberts Briņķis">

        @viteReactRefresh 
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        <!-- As you can see, we will use vite with jsx syntax for React-->
        @routes
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>