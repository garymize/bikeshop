@extends('layouts.formsLayout') 

@section('title', 'Verify Email')

@section('mm-header')
    <div>Verify Email</div>
@stop

@section('mm-canvasColor')
    style="background-color: #f7f7f7;"
@stop

@section('mm-content')

    <div>
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

