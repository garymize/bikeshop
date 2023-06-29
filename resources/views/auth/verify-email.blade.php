<x-guest-layout>
    <div style='margin-bottom: 20px;'>
        <div style='font-size: 18px;'>
            {{ __('Email Sent: Please Verify your Email Address ( may need to check the Junk Mail folder ).') }}
        </div>

        @if (session('status') == 'verification-link-sent')
            <div style='font-size: 18px;'>
                {{ __('A new verification link has been sent to the email address provided.') }}
            </div>
        @endif
    </div>
    <div>
        <form method="POST" action="{{ route('verification.send') }}">
            @csrf

            <div>
                <x-primary-button>
                    {{ __('Resend Verification Email') }}
                </x-primary-button>
            </div>
        </form>

        <form method="POST" action="{{ route('home') }}">
            @csrf
            <div style='text-align: center;'>
                <button type="submit" >
                    {{ __('Home') }}
                </button>
            </div>
        </form>
    </div>
</x-guest-layout>
