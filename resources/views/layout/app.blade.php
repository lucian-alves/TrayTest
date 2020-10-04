<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TrayTest</title>

    <!-- Flex Modal -->
    <link rel="stylesheet" href="/plugins/flex-modal/flex-modal.css">
    <script src="/plugins/flex-modal/flex-modal.js"></script>

    <!-- Flex Loader -->
    <link rel="stylesheet" href="/plugins/flex-loader/flex-loader.css">
    <script src="/plugins/flex-loader/flex-loader.js"></script>

    <!-- Flex Table List -->
    <link rel="stylesheet" href="/plugins/flex-table-list/flex-table-list.css">

    <!-- Vanilla Masker -->
    <script src="/plugins/vanilla-masker/vanilla-masker.min.js"></script>

    <link rel="stylesheet" href="/main.css">
    <script src="/main.js"></script>
    
</head>
<body>
    <div class="pageContent">
        @yield('content')
    </div>
    @include('layout/footer')
</body>
</html>
