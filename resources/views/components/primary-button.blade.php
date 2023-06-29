<button {{ $attributes->merge(['type' => 'submit', 'class' => 'three-d-button red-button verify-email-button', 'style' => 'line-height: 39px; width: 255px; font-size: 20px;']) }}>
    {{ $slot }}
</button>
