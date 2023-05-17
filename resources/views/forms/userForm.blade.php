@section('content')

<body>
    <p>This is my body content.{{ bikershop_now() }}</p>
    <p>This is my body content.{{ pg_date(bikershop_now()) }}</p>    
</body>

@stop
