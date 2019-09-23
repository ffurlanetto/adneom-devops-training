# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

# Vagrant provisioning script
$script = <<-SCRIPT
sudo snap install docker
wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install openjdk-8-jdk-headless -y
sudo apt-get install jenkins -y
sudo systemctl start jenkins
echo 'Waiting for Jeknins to startup...'
sleep 30
echo 'Jenkins initial admin password:'
cat /var/lib/jenkins/secrets/initialAdminPassword
echo 'Open you browser to http://localhost:9060'
SCRIPT

# Vagrant vm configuration
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "generic/ubuntu1904"
    config.vm.network "forwarded_port", guest: 8080, host: 9060
    config.vm.provision "shell", inline: $script  
    config.vm.provider :virtualbox do |vb|
      vb.customize [
        'modifyvm', :id,
        '--natdnsproxy1', 'on',
        '--memory', '2048',
        '--cpus', '2'
      ]
    end
  end