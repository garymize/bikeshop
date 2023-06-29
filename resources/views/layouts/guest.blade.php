@extends('layouts.formsLayout') 

@section('title', 'View User')

@section('mm-header')
    <div>View User</div>
@stop

@section('mm-canvasColor')
    style="background-color: #f7f7f7;"
@stop

@section('mm-content')

    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
        <div>
            <a href="/">
                <img src='/images/dhc-logo.webp' width="150px"/>
            </a>
        </div>

        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
            {{ $slot }}
        </div>
    </div>
    @csrf

@stop

