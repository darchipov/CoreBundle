<?php

namespace Ekyna\Bundle\CoreBundle\Uploader;

use Gaufrette\Filesystem;
use Ekyna\Bundle\CoreBundle\Model\ImageInterface;

class ImageUploader implements ImageUploaderInterface
{
    protected $filesystem;

    public function __construct(Filesystem $filesystem)
    {
        $this->filesystem = $filesystem;
    }

    public function upload(ImageInterface $image)
    {
        if (!$image->hasFile()) {
            // No upload but rename ?
            if($image->shouldBeRenamed()) {
                $old_path = $image->getPath();
                $this->generatePath($image);
                return $this->filesystem->rename($old_path, $image->getPath());
            }
            return true;
        }

        // Remove before upload
        if(!$this->remove($image)) {
            return false;
        }

        $this->generatePath($image);

        return $this->filesystem->write(
            $image->getPath(),
            file_get_contents($image->getFile()->getPathname())
        );
    }

    public function remove(ImageInterface $image)
    {
        if ($image->hasPath()) {
            return $this->filesystem->delete($image->getPath());
        }
        return true;
    }

    protected function generatePath(ImageInterface $image)
    {
        if($image->hasPath()) {
            $path = pathinfo($image->getPath(), PATHINFO_DIRNAME).'/'.$image->guessFilename();
            if(!$this->filesystem->has($path)) {
                $image->setPath($path);
                return;
            }
        }
        
        do {
            $hash = md5(uniqid(mt_rand(), true));
            $path = sprintf(
                '%s/%s/%s',
                substr($hash, 0, 2),
                substr($hash, 2, 2),
                $image->guessFilename()
            );
        } while ($this->filesystem->has($path));
        
        $image->setPath($path);
    }
}
