@extends('layouts.formsLayout') 

@section('title', 'Verify Email')

@section('mm-header')
    <div>Verify Email</div>
@stop

@section('mm-canvasColor')
    style="background-color: #f7f7f7;"
@stop

@section('mm-content')

    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
        <div style='text-align: center; margin-bottom: 20px;'>
            <a href="/">
                <img src='/images/dhc-logo.webp' width="150px"/>
            </a>
        </div>

        <div>
            {{ $slot }}
        </div>
    </div>
    @csrf

@stop

