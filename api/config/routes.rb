# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :v1 do
    resources :users
    post '/login', to: 'sessions#create'

    resources :calories
    resources :weights
  end
end
