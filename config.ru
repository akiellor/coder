root=File.join(Dir.pwd, 'public')
run Rack::Builder.new {
  map '/' do
    run lambda { [302, {'Content-Type' => 'text/plain', 'Location' => '/public/html/index.html'}, []] }
  end
  
  map '/public' do
    run Rack::Directory.new(root)
  end
}

